# Modernizing .NET Apps 

## Key Takeaway

A developer benefits the following key takeaways from this exercise -

1. With Visual Studio and Azure App Service, you can easily migrate your on-premise ASP.NET application to Azure
1. With Durable Functions and C#, you can easily modernize your application with workflows to add functionality to your app without changing your existing codebase.
1. With API Management, you can easily secure and monitor your published APIs with throttling and advanced analytics.

## Before you begin

1. Install <a href="https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=enterprise&ch=pre&rel=16">Visual Studio 2019 (preview)</a>  onto the demo machine.

1. Install <a href="https://nodejs.org/en/download/">Node.js</a> in the demo machine.

1. Microsoft Azure Account: You will need a valid and active Azure account for the Azure labs. If you do not have one, you can sign up for a free <a href="https://azure.microsoft.com/en-us/free/">trial</a>

1. <a href="https://marketplace.visualstudio.com/items?itemName=VisualStudioWebandAzureTools.AzureFunctionsandWebJobsTools">Azure Functions Tools for Visual Studio</a>

1. <a href="https://dotnet.microsoft.com/download/dotnet-core/2.2">.NET Core 2.2 SDK</a>

1. Tailwind Traders Website GitHub code from https://github.com/Microsoft/TailwindTraders-Website.git

1. Tailwind Traders Rewards site GitHub code from 
https://github.com/Microsoft/TailwindTraders-Rewards.git 

Let us explore the existing ASP.NET Web Form Tailwind Traders web application with SQL DB and migrate it to Azure; then modernize the app to support our new rewards program. We’ll show auto-scaling by introducing a spike in the web app traffic and use APIM to secure and monitor our API.

## Walkthrough: Migrating a .NET app to Azure without code change

1. By launching the new **Visual Studio 2019**, you will immediately notice its simplified “Open” experience.

    ![Launch VS](images/launchvs.png)

1. Clone or check out the code of **Tailwind Traders** web application directly by clicking **Clone or Checkout code** on the right side of the window. Enter the repository URL – https://github.com/Microsoft/TailwindTraders-Website.git in the Code Repository Location and click **Clone**. Cloning the code brings it into the Visual Studio view.

    ![Code Clone](images/codeclone.png)

1. Under the **Solutions and Folders**, click **Tailwind.Traders.Web.sln** to open the solution.

    ![Load Solution](images/solution-and-folders.png)

1. Once the solution is loaded, press **F5** to start debugging the application. This is a web application built with **ASP.NET webforms**, **jQuery** and **SQL Server** database which is being used by their Customer Support team to track orders.  

    ![Local Debugging](images/tailwindapp.png)

1. When the application loads, search for a specific customer - *Micheal* using the **Search** icon. The search pulls up his contact information and the order history. 

    ![Search Results](images/searchuser.png)

    > Since the local infrastructure is outgrowing on which the application is hosted, let's look at the Azure cloud capabilities. The Azure cloud offers a host of platforms and service offerings. To start with, you will use the **Azure App Services** to host the application without any changes to the existing code!

1. Head over to **Visual Studio** and stop debugging the application. Close the existing solution and click **Clone or check out code** option and enter the **Tailwind Traders Rewards** repository URL – https://github.com/Microsoft/TailwindTraders-Rewards.git in the Code Repository Location and click **Clone**. Under the **Solutions and Folders**, click **Tailwind.Traders.Rewards.sln** to open the solution.

    ![Rewards Clone](images/clonerepo.png)

1. Right-click the project **Tailwind.Traders.Rewards.Web** and choose **Publish**. This is the same Publish dialog box that you can use to deploy onto **IIS6** in your local infrastructure. Using this *Publish* dialog, you will deploy the application to Azure cloud. 

    ![Publish App](images/publishapp.png)

1. Choose **App Service** as the Publish target. Under the **Azure App Service** window, choose **Create New** and click **Publish**.

    ![Publish Options](images/appprofile.png)

1. In the resulting window, enter your Azure subscription information, choose the **App Service**, create a new or choose an existing **Resource Group**, **Hosting Plan**, **Application Insights**. Click the **Create a SQL database** option on the right side and create a new Azure SQL server and an Azure SQL database within the resulting windows. Finally, click **Create** to create a publish profile. Alternatively, you can create the *Azure SQL database* directly on the Azure Portal.

    ![Create Profile](images/createprofile.png)

    ![Created Profile](images/createdprofile.png)

1. Click **Configure** in the Publish window to check the database connection strings. The database connection strings can be populated by clicking the ellipsis button and entering the SQL database details. On clicking publish, the web config file will be updated with this database string which is pointing to an **SQL Azure database**.  When the application is debugged locally, its the local IIS and the local SQL server which acts but when the app is published, this is going to be swapped with the created Azure services.

    ![DB Connection strings](images/dbconnstrings.png)

1. Click **Publish** to deploy the application to Azure App Service and the back-end to SQL Azure database.

    ![Publish app](images/publish.png)

1. Once the app is published, you will see the status as **Publish succeeded** and the Azure web app is opened in the browser. The website is now showing with data from SQL Azure database. 

    ![Publish succeeded](images/publishsuccess.png)

    ![Azure Web App](images/azurewebapp.png)

## Walkthrough: Azure App Service Features

Now that the Azure web app is running, let's look at some options available in the Azure Portal for this App service. 
 
 1. Navigate to the Azure Web App service in the Azure Portal. On the left blade, you will see a host of options available to configure for the existing web app. For instance, consider the **Deployment slots(Preview)** which allows you to set up different environments for the application. Slots are useful for DevTest and production environments, A/B testing or probably to verify a core functionality before swapping the site to production.

    ![Deployment Slots](images/deployslots.png)

1. Scroll down to the option **SSL Settings** where you can set up custom domains. Scroll down further to another feature **Scale up**, **Scale out**. 

    ![App Options](images/appoptions.png)

1. Let us explore the Scale up and Scale out options in Azure. A **Scale up** is the Azure websites cloud equivalent of moving your non-cloud web site to a bigger physical server. Scale up operations are useful to consider when your site is hitting a quota, signaling that you are outgrowing your existing mode or options.  In addition, scaling up can be done on virtually any site without worrying about the implications of multi-instance data consistency. 

    ![Scale up](images/scaleup.png)

1. Whereas, **Scale out** operation is the equivalent of creating multiple copies of your web site and adding a load balancer to distribute the demand between them. When you scale out a web site in Windows Azure websites, there is no need to configure load balancing separately since this is already provided by the platform.  

    ![Scale out](images/scaleout.png)

1. Choose **Scale out** option from the blade and click **Enable autoscale**. Name the rule as **Rewards scale** and select the Resourcegroup if required. Add a rule that whenever the CPU percentage exceeds 70%, additional instances should be automatically created for the existing App service. Save the changes 

    ![CPU Rule](images/cpurule.png)

1. Another feature which is important is the ability to collect **logs and telemetry information** to monitor the application performance which is known as **Application Insights** in Azure. Click the feature and then click **Turn on site extension** to explore its services. 

    ![App Insights](images/appinsights.png)
    ![Extension Enable](images/enableappinsights.png)

1. Take a look at your web application dashboard by clicking **View application insights data** to quickly notice the **server response time**, the **server requests**, **application exception failures**, etc.

    ![Insights Data](images/insightsdata.png)

1. Click **Failures** in the left blade of the Application Insights page to dig down into the operations and exceptions that have happened in this application. You will notice that there are exceptions which you can further explore.

    ![Exceptions](images/failures.png)

1. Click **Drill into...** to get details about the exception of this instance. Now on the right-hand side, you will see the exception details and information about the call stack.

    ![Error Details](images/errordetails.png)

    ![Error message](images/errormsg.png)

1. Under related items, click **User Flows**. This view allows you to see the path that the user took to get to that exception.

    ![User Flows](images/userflows.png)

1. **Debug Snapshot** is another feature within the Application Insights that help you to download a snapshot of the exception to get an understanding of the state of the variables. You can load the downloaded snapshot into Visual Studio and engage the debugger to check the issues in the service that was running. It's almost like you're debugging in production except that you are bringing the production dump into your local Visual Studio and debug the exceptions locally.

    ![Debug Snapshot](images/debugsnapshot.png)

## Walkthrough: Azure Logic App 

Now that we have seen how to deploy an application onto Azure and how to get some richer debug information, let's head back to the application mode. **Azure Logic Apps** simplifies how you build automated scalable workflows that integrate apps and data across cloud services and on-premises systems. We have a large number of connectors that we could use for instance the Azure service bus to make HTTP requests, SAP connectors, etc.

1. On the left side of the application, you will see an option **Enroll in loyalty program**. The supposed functionality of this option is that every time the checkbox is clicked, a workflow is started to verify the user and enroll them in Tailwind Traders' loyalty program.  When you check that check-box, you will only see a *Enrollment in process* message.

    ![Enroll program](images/enrollprogram.png)

1. Since this workflow is not embedded in the application yet, you will use the Azure features to implement the same. Go back to the Azure portal and create a new **Logic App**. Let's quickly harness the power of Logic Apps to create a trigger on an SQL Server table whenever the Customers table is modified (“Enroll in loyalty program” checkbox is checked).  

    ![Logic app](images/logicapp.png)

1. You are looking at the feature to create serverless workflows. Click the **Logic app designer** option in the left blade and notice the various templates and trigger options show up. Let's configure the workflow to implement the Loyalty program feature. 

    ![templates and triggers](images/template.png)

    > The workflow is to monitor the **Customers** table at an interval of every 10 seconds. When there is a change in the table data, the workflow starts to execute. Next, based on the modified row, the customer's information - Name and Mobile number is fetched for which a text message is sent.  All this information is fetched from the **Customers** table in the database. 

1. Click **Blank Logic App** to create a blank logic app. 

    ![Blank Logic App](images/newlogicapp.png)

1. Search for **SQL Server** in the search bar, select **SQL Server** and then select the **When an item is modified** trigger.

    ![SQL Server trigger](images/sqltrigger.png)

1. Provide the **SQL Server** credentials and choose the **Tailwind Traders** database and click **Create**. I am monitoring this customer table. Now at any time, when there's a change in this customer table the workflow is going to start to execute.

    ![SQL Details](images/sqldetail.png)

1. In the resulting window, choose **Customers** as the SQL table, set the **interval** as *10* and **Frequency** as *Seconds*. Click the **+ New step** icon to create a new step.

    ![Choose Table](images/choosetable.png)

1. Search for **SQL** in the search box and choose **Get row** as the corresponding action.

    ![Get row](images/getrow.png)

1. In the next window, select **Customers** as the Table name. Click the **Add dynamic content** below the **Row Id** textbox and select **Email** as the identifier for the **Row id** field. Click the **+ New step** icon to create a new step.

    ![Details](images/custdetail.png)
    ![Dynamic content](images/dynamiccontent.png)

1. In the search bar, type **send text message** and select the **Twilio** action to configure and send a text message. 

    ![SMS](images/sms.png)

    > You need to create a Twilio account beforehand and use its details to configure it here.

1. Provide the connection name, Twilio account credentials and click **Create**. Enter the mobile number and other details in the resulting window. Use the dynamic content from the **Dynamic content** box available within the designer. Save the changes. However, you can hard code the **To Phone Number** with your valid mobile number since the mobile number in the database is dummy data.

    ![Twilio Config](images/twilio-config.png)

    ![Twilio](images/twilio.png)

    ![Dynamic content](images/dynamic-twilio.png)

1. When you click the checkbox, the corresponding record is updated in the database which will essentially flip a flag that enrolls the customer to the loyalty program and sends them a text message.