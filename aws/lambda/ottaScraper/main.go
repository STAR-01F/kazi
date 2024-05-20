package main

import (
	"errors"

	"github.com/aws/aws-lambda-go/lambda"

	"encoding/json"

	"fmt"
	"io"
	"net/http"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
)

type OttaError struct{
	Error string `json:"error"`
}

func scrape(url string) (map[string]interface{}, error) {
	// Make HTTP GET request
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	// Read the response body
	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	// Regular expression to find JSON-LD script tag
	re := regexp.MustCompile(`<script data-rh="true" type="application/ld\+json">([\s\S]*?)<\/script>`)
	matches := re.FindSubmatch(body)
	if matches == nil {
		return nil, fmt.Errorf("no JSON-LD data found")
	}

	jsonLD := matches[1]

	// Parse the JSON-LD data
	var data map[string]interface{}
	if err := json.Unmarshal(jsonLD, &data); err != nil {
		return nil, err
	}

	// Process the data
	cleaned := cleanMap(data)
	return cleaned, nil
}

var re = regexp.MustCompile(`<.*?>`)

// cleanMap and cleanSlice can also go in this file
func cleanMap(data map[string]interface{}) map[string]interface{} {
	cleaned := make(map[string]interface{})
	for k, v := range data {
		switch v := v.(type) {
		case map[string]interface{}:
			cleaned[k] = cleanMap(v)
		case []interface{}:
			cleaned[k] = cleanSlice(v)
		default:
			cleaned[k] = re.ReplaceAllString(fmt.Sprintf("%v", v), "*")
		}
	}
	return cleaned
}

func cleanSlice(data []interface{}) []interface{} {
	cleaned := make([]interface{}, len(data))
	for i, v := range data {
		switch v := v.(type) {
		case map[string]interface{}:
			cleaned[i] = cleanMap(v)
		case []interface{}:
			cleaned[i] = cleanSlice(v)
		default:
			cleaned[i] = re.ReplaceAllString(fmt.Sprintf("%v", v), "")
		}
	}
	return cleaned
}

type JobURL struct {
	Url string `json:"url"`
}

func handleOttaScrape(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var url JobURL
	var respError OttaError

	err2 := errors.New("fake error")
	if err2 != nil {
		respError.Error  = err2.Error()
		lambdaErr, _ := json.Marshal(respError)

		return events.APIGatewayProxyResponse{
			Body: string(lambdaErr),
		}, err2
	}

	
	err := json.Unmarshal([]byte(request.Body), &url)
	if err != nil {
		respError.Error  = err.Error()
		lambdaErr, _ := json.Marshal(respError)

		return events.APIGatewayProxyResponse{
			Body: string(lambdaErr),
		}, err
	}


	jobInfo, err := scrape(url.Url)
	if err != nil {
		respError.Error  = err.Error()
		lambdaErr, _ := json.Marshal(respError)

		return events.APIGatewayProxyResponse{
			Body: string(lambdaErr),
		}, err
	}

	jobBytes, err := json.Marshal(jobInfo)
	if err != nil {
		respError.Error  = err.Error()
		lambdaErr, _ := json.Marshal(respError)

		return events.APIGatewayProxyResponse{
			Body: string(lambdaErr),
		}, err
	}

	response := events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(jobBytes),
	}

	return response, nil
}

func main() {
	lambda.Start(handleOttaScrape)
}
