#!/bin/bash

set -e
UserExec="$(pwd)"
ScriptBase="$(cd $(dirname "${0}") && pwd )"
ApitestName="mll-apitest"

cd "${ScriptBase}" && cd ../
echo "::: Test apis :::"
docker-compose exec "${ApitestName}" npm run apitest
