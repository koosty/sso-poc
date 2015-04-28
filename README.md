Single Sign On Proof Of Concept
===============================

Ingredients:
-----------
* Jasig Cas
* SpringFramework
* PostgreSQL
* Maven

Database Setup:
---------------
* create user caliga with password caliga

	CREATE USER caliga WITH PASSWORD 'caliga';

* create database caliga

	CREATE DATABASE caliga OWNER caliga;
	
Run Applications:
-----------------
* go to sso-poc/client1 and type

	mvn spring-boot:run -Dspring.profiles.active=liquibase
	
> this will initialize the database, sample data and run tomcat at port 9001

* go to sso-poc/client2 and type

	mvn spring-boot:run
	
> we don't need to initialize the database twice, for simplicity all apps using the same database, this will run tomcat on port 9002

* go to sso-poc/sso-server and type

	mvn package jetty:run
	
> this will run tomcat for SSO server on port 9443 (https)

Testing:
--------
1. open [http://localhost:9001](http://localhost:9001) to access client1 apps
2. click dashboard menu and you will be redirected to [https://localhost:9443/login](https://localhost:9443/login) to login.
3. enter admin for user and password
4. after succesful login you will be redirected back to [http://localhost:9001](http://localhost:9001) and you can access the dashboard menu
5. open [http://localhost:9002](http://localhost:9002) this is client2 apps, you can access the dashboard menu without login first since you are already logged in.
6. if you logged out on one of the apps, either client1 or client2 then you will be logged out from all apps.
 