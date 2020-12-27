#/usr/bin/env bash

em++ \
  -s INITIAL_MEMORY=64kb \
  -s MAXIMUM_MEMORY=64kb \
  -s ALLOW_MEMORY_GROWTH=0 \
  -s TOTAL_STACK=0kb \
  -s ENVIRONMENT=web \
  -s MODULARIZE=1 \
  -s WASM=1 \
  -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']" \
  -s EXPORTED_FUNCTIONS="['_getFirstItem', '_add', 'ccall', 'cwrap']" -Wl,--no-entry \
  "src/wasm/src/add.cpp" -o "src/wasm/build/add.js"
