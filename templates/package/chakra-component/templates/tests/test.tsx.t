---
to: "<%= h.packageDir(org, name) %>/tests/<%= h.filename(name) %>.test.tsx"
---
<% component = h.inflection.camelize(name, false) -%>
/**
 * 📝 Notes for Contributors:
 * 
 * - Ensure you write tests for component behavior defined in the hook.
 * - Ensure you write tests for the accessibility and interactions.
 * - No snapshot tests for components please! 🙂
 * 
 * @see Testing-Guide https://chakra-ui.com/guides/component-guide#4-build-and-test
 */

import * as React from 'react'
import { renderHook } from '@chakra-ui/test-utils'

import { use<%= component %> } from '../src'

describe("use<%= component %>", () => {
  test("it works", () => {
    expect(true).toBeTruthy();
  });
});
