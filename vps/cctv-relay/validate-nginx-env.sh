#!/bin/sh
set -eu

# Fail closed before the official nginx entrypoint renders the configuration.
for name in STREAM_SECRET STREAM_DOMAIN API_AUTH_HEADER_SECRET; do
    eval 'value=${'"$name"'-}'
    if [ -z "$value" ]; then
        echo "$name must be configured" >&2
        exit 1
    fi
done
