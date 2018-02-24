# mx-angular-component-seed
Seed project for creating AngularJS components, directives &amp; Services

Clone this repository and then change the following entires:-

# Manual Method

**package.json**
1. name - This is the name of your project
2. description - Give your project a meaningful description
3. repository - The URL to your Git repository

**bower.json**
1. name - This is the name of your project
2. description - Give your project a meaningful description
3. homepage - The URL to your Git repository

**build.conf.js**
1. buildJsFilename - The compressed & minified name of your output JavaScript file. This is what others will include using <code>&lt;script&gt;</code> tags

# Automated Approach
Use the init.js script to automatically update these values.

**Usage**

<code>node init.js &lt;project-name&gt; &lt;project-description&gt; &lt;git-repository-url&gt; &lt;output-filename&gt;</code>

**Example**

<code>node init.js "your-project-name" "What your awesome project does" "https://github.com/you/your-project-name" "your-project-name.js"</code>