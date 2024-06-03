const fs = require('fs');
const path = require('path');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

function insertGlobalCounter(path, state) {
  // 只在全局作用域中插入一次
  if (!state.inserted) {
    const limitId = path.scope.generateUidIdentifier('L');
    const breakFunctionId = path.scope.generateUidIdentifier('B');

    state.limitId = limitId;
    state.breakFunctionId = breakFunctionId;

    path.unshiftContainer('body', t.variableDeclaration('const', [
      t.variableDeclarator(limitId, t.numericLiteral(state.opts.maxIterations))
    ]));
    path.unshiftContainer('body', t.variableDeclaration('const', [
      t.variableDeclarator(breakFunctionId, t.functionExpression(null, [], t.blockStatement([
        t.throwStatement(t.newExpression(t.identifier('Error'), [t.stringLiteral('EO.JSH - Loop exceeded maximum allowed iterations')]))
      ])))
    ]));

    state.inserted = true;
  }
};

function insertLoopCounter(path, state) {
  const localCounterId = path.scope.generateUidIdentifier('C');

  const counterDeclaration = t.variableDeclaration('let', [
    t.variableDeclarator(localCounterId, t.numericLiteral(0))
  ]);

  path.insertBefore(counterDeclaration);

  const updateExpression = t.updateExpression('++', localCounterId);

  const logicalExpression = t.logicalExpression(
    '&&',
    t.binaryExpression('>', updateExpression, state.limitId),
    t.callExpression(state.breakFunctionId, [])
  );

  const expressionStatement = t.expressionStatement(logicalExpression);

  if (t.isBlockStatement(path.node.body)) {
    path.get('body').unshiftContainer('body', expressionStatement);
  } else {
    const newBody = t.blockStatement([expressionStatement, path.node.body]);
    path.node.body = newBody;
  }
};

function inject(origin, limit) {
  if (!origin || typeof limit !== 'number') {
    throw new Error('Invalid parameters');
  }

  let ast;
  let injected;
  
  try {
    ast = parser.parse(origin, {
      sourceType: 'script',
    });
  } catch (err) {
    throw new Error('Code parsing error');
  }
  
  const loopInstrumentationPlugin = {
    visitor: {
      Program: {
        enter(path, state) {
          insertGlobalCounter(path, state);
        }
      },
      // 限制 for while forof forin
      Loop(path, state) {
        insertLoopCounter(path, state);
      }
    }
  };
  
  try {
    traverse(ast, loopInstrumentationPlugin.visitor, undefined, { opts: { maxIterations: limit } });
  } catch (err) {
    throw new Error('Code transformation error');
  }
  
  try {
    injected = generate(ast, {}, origin).code;
  } catch (err) {
    throw new Error('Code generation error');
  }

  if (!injected) {
    throw new Error('Code generation error');
  }

  return injected;
}

const originPath = path.join(__dirname, '../__test__/src/origin.js');
const originCode = fs.readFileSync(originPath).toString();

const injected = inject(originCode, 10);

const injectPath = path.join(__dirname, '../__test__/src/injected.js');
fs.writeFileSync(injectPath, injected);