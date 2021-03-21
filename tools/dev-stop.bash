#!/bin/bash

set -e
UserExec="$(pwd)"
ScriptBase="$(cd $(dirname "${0}") && pwd )"

cd "${ScriptBase}" && cd ../
echo "::: Stop backend services :::"
docker-compose down -v
echo "::: OK! :::"

