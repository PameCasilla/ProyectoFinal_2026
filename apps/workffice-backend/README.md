# Workffice backend

![workffice-logo.png](workffice-logo.png)

[![CICD](https://github.com/workffice/workffice-backend-v1/actions/workflows/continous-deployment.yml/badge.svg?branch=main)](https://github.com/workffice/workffice-backend-v1/actions/workflows/continous-deployment.yml)
[![codecov](https://codecov.io/gh/workffice/workffice-backend-v1/branch/main/graph/badge.svg?token=I96FLHDJL5)](https://codecov.io/gh/workffice/workffice-backend-v1)

## Description
This project is a solution for those office holders who want to
level up their business. The most important features that this
project support are:
- Renting
- Reporting
- Search

## Run project locally
#### Prerequisites
1. Have docker installed
2. Have docker-compose installed

Now you have to:
### Linux
Run the makefile doing `make runserver` and once you are done you have\
tor run `make stopserver`
### Windows
For windows users you have to:
1. Run `gradlew.bat bootJar`
2. Run `docker-compose up`
3. Once you are done run `docker-compose down`

## Development
### Linter
You have to configure your IDE with the
`checkstyle.xml` file located in `workffice-backend/config/checkstyle/checkstyle.xml`

Tips:
- You can follow this [guide](https://somindagamage.medium.com/how-to-configure-checkstyle-and-findbugs-plugins-to-intellij-idea-38148aad2387)
to configure checkstyle on IntelliJ
- The import layout should be this:
```
import all other imports
<blank line>
import java.*
import javax.*
import org.*
<blank line> 
```
- Star import configuration (we don't allow star import)
```
Class count to use import with "*": 100
Name count to use static import with "*": 100
```
### Env variables
For development we use H2 Database and then
you will also need some env variables like
See `../../GMAIL_SETUP.md` for Gmail SMTP configuration.
