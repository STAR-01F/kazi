# AWS SAM Developer Readme

A guide to deploying lambdas via AWS' SAM CLI

## Setup

To get started, install both the AWS CLI and SAM CLI -
[instructions on aws](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

## Getting Started

Create a file called **template.yaml** within the relevant directory. Within, define the resource(s) that you wish to create - [some examples here](https://medium.com/carsales-dev/api-gateway-with-aws-sam-template-c05afdd9cafe)

## Validation/Testing

### Docker

With Docker active on your system, you're able to test your lambda locally before deployment

```bash
sam local invoke
```

and even pass events to it.

```bash
sam local invoke -e {adirectory}/{yourfilename}.json
```

Let's assume your lambda reads the name field of the request body.

```json
[
  {
    "name": "Bobby Axelrod"
  }
]
```

Create a {yourfilename}.json stored within {adirectory}. Call the above prompt and assess the output on the terminal

#### Linting

```bash
sam validate --lint
```

This reads and template.yaml and displays any errors that may occur or nil.

## Deployment

Having successfully tested your lambda with sam invoke and fixed any errors raised by the lint, you may wish to deploy.

This happens in two steps :

```bash
sam build
```

This will build your assets using the config within your template.yaml. AWS SAM CLI creates a .aws-sam (within which will be your build and a build.toml fle)

Don’t edit any code under the .aws-sam/build directory.
Instead, update your original source code in your project folder
and run sam build to update the .aws-sam/build directory.

Always run SAM build when making changes to your original source code

```bash
sam deploy --guided
```

_use the guided flag on initial builds, you may omit for subsequent builds_

The above flag will deploy your assets which can be viewed on AWS' CloudFormation service. You'll have a few simple y/n prompts to answer after which the deployment is concluded, if successful.
