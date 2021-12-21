---
to: "<%= h.packageDir(org, name) %>/README.md"
---
<% package = h.packageName(org, name) -%>
# <%= package %> 

Description

## Installation

```sh
$ yarn add <%= package %> 

#or

$ npm i <%= package %>  --save
```

## Usage

## License

MIT - Appulse Software
