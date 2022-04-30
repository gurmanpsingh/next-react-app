#### About the project

This project is to fetch the product from limelight and checkout through nextjs app

Install the required packages
npm install

If all packages are installed, Use below command to generate the build folder
npm run build

Start the node server
npm start

Create the .env file on root and add the below details

USER_ID=limelightCRM_user

USER_KEY=limelightCRM_pass

GMAILLOGIN=GMAIL_LOGIN

GMAILPASS=GMAIL_PASS

#Contentful Details

SPACE_ID=SPACE_ID

#Content Delivery API - access token

CONTENTFUL_ACCESS_TOKEN=TOKEN

#Content Preview API - access token

CONTENTFUL_PREVIEW_ACCESS_TOKEN=ACCESS_TOKEN

NODE_DEV=dev

PORT=3000

BASEURL=http://192.168.127.1:3000

REACT_APP_BASE_URL = http://192.168.127.1:3000

dev for development; production for Production app (byDefault it is true for dev)

NODE_DEV=dev
