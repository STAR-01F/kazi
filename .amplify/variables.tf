variable "token" {
  type        = string
  description = "github token to connect github repo"
  default     = "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"
}

variable "repository" {
  type        = string
  description = "github repo url"
  default     = "https://github.com/STAR-01F/trackAI.git"
}

variable "app_name" {
  type        = string
  description = "AWS Amplify App Name"
  default     = "trackAI-frontend"
}

variable "branch_name" {
  type        = string
  description = "AWS Amplify App Repo Branch Name"
  default     = "TRAC-54-deploy-frontend-for-testing"
}


variable "domain_name" {
  type        = string
  default     = "amplifyapp.com"
  description = "AWS Amplify Domain Name"
}