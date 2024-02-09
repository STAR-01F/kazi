package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

type JobURL struct {
	Url string `json:"url"`
}

func handleOttaScrape(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var url JobURL

	err := json.Unmarshal([]byte(request.Body), &url)

	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: string(err.Error()),
		}, err
	}

	jobInfo, err := scrape(url.Url)

	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: string(err.Error()),
		}, err
	}

	jobBytes, err := json.Marshal(jobInfo)

	if err != nil {
		return events.APIGatewayProxyResponse{
			Body: string(err.Error()),
		}, err
	}

	response := events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jobBytes),
	}

	return response, nil

}
