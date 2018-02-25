# mx-angular-component-seed
Seed project for creating AngularJS modules with re-usable components, directives &amp; Services

Clone this repository and then change the following entires:-

# Manual Method

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
Use the update-metadata.js script to automatically update these values.

**Usage**

<code>node update-metadata &lt;project-name&gt; &lt;project-description&gt; &lt;output-filename&gt; [github-project-url] [git-ssh-url]</code>

The <code>github-project-url</code> and <code>git-ssh-url</code> are optional parameters. If you don't provide them the corresponding values will not be changed in the configuration files listed above.

**Example**

<code>node update-metadata your-project-name "What your awesome project does" output-filename.js "https://github.com/your-username/your-project-name" "git@github.com:your-username/your-project-name.git"</code>


# Full-Auto (Create GitHub Repository as well)
The init.js does all the things update-metadata.js does and creates a Github repository for your project.
For this an access-token is necessary.

To generate an access-token follow these steps:-

1. Goto https://github.com and login with your account
2. Click on your Avatar at the top right corner of Github and then select **Settings** from the drop down menu
3. Goto **Developer Settings** from the side menu (bottom left)
4. Goto **Personal access tokens** from the side menu
5. Click on the **Generate new token** button on the top right
6. Enter your Github password (if prompted)
7. Give the token a description such as (Repository Seeder)
8. From the **Select scopes** section check **public_repo** under **repo**. This allows access to your Access public repositories which this script needs to list your existing repositories and create new ones.
9. Scroll down and click on **Generate token**
10. You will be taken back to the **tokens** page. The newly created token should be highlighted in green. Copy that. This is your access token which you must pass to the init.js script.


**Usage**

<code>node init &lt;project-name&gt; &lt;project-description&gt; &lt;output-filename&gt; &lt;access-token&gt;</code>

**Example**

<code>node init your-project-name "What your awesome project does" output-filename.js 72a8a3e2b8374bcb8acaf0d0f7f4a708</code>