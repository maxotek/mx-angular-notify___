# mx-angular-component-seed
Seed project for creating AngularJS modules with re-usable components, directives &amp; Services

# TL;DR Version
**Goal:** Create a new AngularJS Module

**Steps:-**

1. Make directory for your new project on your machine

    <code>mkdir mx-angular-notify</code>

2. Change to the newly created directory

    <code>cd mx-angular-notify</code>

3. Open Git bash & clone this seed repository in this directory

    <code>git clone https://github.com/maxotek/mx-angular-module-seed.git .</code>

4. Generate an Access Token so that the init script can create a GitHub repository for you. See the [section](#generate-access-token) below to see the steps on how to generate an access token

5. Initialize your project by giving it a suitable name, description, specifying the name of your compressed/minified JavaScript file and finally providing the access token you generated in the previous step

    <code>node init mx-angular-notify "AngularJS module for showing toast notifications" mx-angular-notify.js 72a8a3e2b8374bcb8acaf0d0f7f4a708</code>

>So, now you have an AngularJS module project locally along with a remote GitHub repository that you will be pushing to. Open up that favorite IDE of yours and start building your AngularJS module.

# Manual Method
Clone this repository and then change the following entires.

**package.json**
1. name - This is the name of your project
2. description - Give your project a meaningful description
3. repository - The URL to your GitHub project

**bower.json**
1. name - This is the name of your project
2. description - Give your project a meaningful description
3. homepage - The URL to your GitHub project

**build.conf.js**
1. buildJsFilename - The compressed & minified name of your output JavaScript file. This is what others will include using <code>&lt;script&gt;</code> tags

**.git/config**
1. [remote "origin"] -> url - The SSH URL to your Github project's repository

# Automated Approach
Clone this repository and then execute the following script.

Use the update-metadata.js script to automatically update these values.

**Usage**

<code>node update-metadata &lt;project-name&gt; &lt;project-description&gt; &lt;output-filename&gt; [github-project-url] [git-ssh-url]</code>

The <code>github-project-url</code> and <code>git-ssh-url</code> are optional parameters. If you don't provide them the corresponding values will not be changed in the configuration files listed above.

**Example**

<code>node update-metadata your-project-name "What your awesome project does" output-filename.js "https://github.com/your-username/your-project-name" "git@github.com:your-username/your-project-name.git"</code>


# Full-Auto (Create GitHub Repository as well)
Clone this repository and then execute the following script.

The init.js does all the things update-metadata.js does and creates a Github repository for your project.
For this an access-token is necessary.

## Generate Access Token

To generate an access-token follow these steps:-

1. Goto https://github.com and login with your account
2. Click on your Avatar at the top right corner of Github and then select **Settings** from the drop down menu
3. Goto **Developer Settings** from the side menu (bottom left)
4. Goto **Personal access tokens** from the side menu
5. Click on the **Generate new token** button on the top right
6. Enter your Github password (if prompted)
7. Give the token a description such as (Repository Seeder)
8. From the **Select scopes** section check **public_repo** under **repo**. This allows access to your public repositories which this script needs to list your existing repositories and create new ones.
9. Scroll down and click on **Generate token**
10. You will be taken back to the **tokens** page. The newly created token should be highlighted in green. Copy that. This is your access token which you must pass to the init.js script.


**Usage**

<code>node init &lt;project-name&gt; &lt;project-description&gt; &lt;output-filename&gt; &lt;access-token&gt;</code>

**Example**

<code>node init your-project-name "What your awesome project does" output-filename.js 72a8a3e2b8374bcb8acaf0d0f7f4a708</code>