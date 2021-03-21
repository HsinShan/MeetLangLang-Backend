#!/bin/bash

set -e
UserExec="$(pwd)"
ScriptBase="$(cd $(dirname "${0}") && pwd )"
AppName="mll-api"
ApitestName="mll-apitest"

cd "${ScriptBase}" && cd ../
echo "::: Test coding styles of api service :::"
docker-compose exec "${AppName}" npm run test
echo "::: Test coding styles of apitest service :::"
docker-compose exec "${ApitestName}" npm run standtest
