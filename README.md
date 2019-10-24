# momenton_coding_challenge

Assumption:

1. Employee who doesn't have any manager apart from CEO will be shown at the bottom of heirarchy in same line as CEO
2. Employee who has mangerid who in turn is not a valid employee will be shown at the bottom of heirarchy in same line as CEO.
3. Employee with no Managerid is assigned as null

In order to run the program

1. Install node

Then run following command on command line

1. Clone the repository
2. yarn # This will install the required dependency
3. yarn start #This starts nodemon on the current folder

In order to run the test case and see the coverage, run the blow on command line

1. yarn test

I have nodemon running in there, so you can make changes to data in inputdata.js file and save, the result would be displayed in the console
