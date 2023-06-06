package controllers

type Response struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

var SuccessfulResponse = Response{
	Status:  "success",
	Message: "",
}

func ErrorResponse(err error) Response {
	return Response{
		Status:  "error",
		Data:    nil,
		Message: err.Error(),
	}
}
