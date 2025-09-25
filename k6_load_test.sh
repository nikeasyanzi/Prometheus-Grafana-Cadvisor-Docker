#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
echo $SCRIPT_DIR}

cat ${SCRIPT_DIR}/k6_load_test_script.js | docker run --rm -i grafana/k6 run -
