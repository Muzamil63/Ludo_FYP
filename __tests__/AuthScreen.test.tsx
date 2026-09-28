import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import AuthScreen from '../src/screens/AuthScreen';

async function render() {
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<AuthScreen />);
  });
  return tree as ReactTestRenderer.ReactTestRenderer;
}

test('shows sign in form by default', async () => {
  const tree = await render();
  const json = JSON.stringify(tree.toJSON());
  expect(json).toContain('Ludo Classic');
  expect(json).toContain('Remember me');
  expect(json).not.toContain('PLAYER USERNAME');
});

test('switches to sign up form when Sign Up tab pressed', async () => {
  const tree = await render();
  const signUpTab = tree.root.findAllByProps({ testID: 'tab-signUp' })[0];
  await ReactTestRenderer.act(() => {
    signUpTab.props.onPress();
  });
  const json = JSON.stringify(tree.toJSON());
  expect(json).toContain('PLAYER USERNAME');
  expect(json).toContain('Create Account');
});
