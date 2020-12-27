#/usr/bin/env bash

em++ --bind -O3 \
  --memory-init-file 0 \
  -s INITIAL_MEMORY=64kb \
  -s MAXIMUM_MEMORY=64kb \
  -s ALLOW_MEMORY_GROWTH=0 \
  -s TOTAL_STACK=0kb \
  -s ENVIRONMENT=web \
  -s WASM=0 \
  -s MODULARIZE=1 \
  -s 'EXPORT_NAME="createModule"' \
  -s "EXTRA_EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']" \
  "src/wasm/src/bind.cpp" -o "src/wasm/build/bind.js"
