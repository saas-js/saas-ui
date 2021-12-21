---
to: "<%= h.packageDir(org, name) %>/src/index.ts"
---
export * from './<%= h.inflection.dasherize(name) %>'