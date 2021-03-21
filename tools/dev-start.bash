#!/bin/bash

set -e
UserExec="$(pwd)"
ScriptBase="$(cd $(dirname "${0}") && pwd )"
AppName="mll-api"

cd "${ScriptBase}" && cd ../
echo "::: Launch backend services :::"
docker-compose up -d
echo "::: OK! :::"
echo "::: Let's show app logs :::"
docker-compose logs -f "${AppName}"

