// Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/login": {
            "post": {
                "description": "Login your account",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "auth"
                ],
                "summary": "Login",
                "parameters": [
                    {
                        "description": "Login data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Login response",
                        "schema": {
                            "$ref": "#/definitions/controllers.LoginResponse"
                        }
                    }
                }
            }
        },
        "/patient": {
            "get": {
                "description": "Get patient",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "patient"
                ],
                "summary": "Get patient",
                "responses": {
                    "200": {
                        "description": "Patient response",
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientListResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Create patient",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "patient"
                ],
                "summary": "Create patient",
                "parameters": [
                    {
                        "description": "Patient data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Patient response",
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientResponse"
                        }
                    }
                }
            }
        },
        "/patient/{id}": {
            "get": {
                "description": "Get patient by id",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "patient"
                ],
                "summary": "Get patient by id",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Patient id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Patient response",
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientResponse"
                        }
                    }
                }
            },
            "put": {
                "description": "Update patient",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "patient"
                ],
                "summary": "Update patient",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Patient id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Patient data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.UpdatePatientRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Patient response",
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete patient",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "patient"
                ],
                "summary": "Delete patient",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Patient id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Patient response",
                        "schema": {
                            "$ref": "#/definitions/controllers.PatientResponse"
                        }
                    }
                }
            }
        },
        "/regulation": {
            "get": {
                "description": "Get regulation",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "regulation"
                ],
                "summary": "Get regulation",
                "responses": {
                    "200": {
                        "description": "Regulation response",
                        "schema": {
                            "$ref": "#/definitions/controllers.RegulationListResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Create regulation",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "regulation"
                ],
                "summary": "Create regulation",
                "parameters": [
                    {
                        "description": "Regulation data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.RegulationRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Regulation response",
                        "schema": {
                            "$ref": "#/definitions/controllers.RegulationResponse"
                        }
                    }
                }
            }
        },
        "/regulation/{id}": {
            "put": {
                "description": "Update regulation",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "regulation"
                ],
                "summary": "Update regulation",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Regulation id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Regulation data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.UpdateRegulationRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Regulation response",
                        "schema": {
                            "$ref": "#/definitions/controllers.RegulationResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete regulation",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "regulation"
                ],
                "summary": "Delete regulation",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Regulation id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Regulation response",
                        "schema": {
                            "$ref": "#/definitions/controllers.RegulationResponse"
                        }
                    }
                }
            }
        },
        "/staff": {
            "get": {
                "description": "Get staff",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Get staff",
                "parameters": [
                    {
                        "type": "string",
                        "description": "Staff name",
                        "name": "name",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "default": 1,
                        "description": "Page",
                        "name": "page",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "default": 10,
                        "description": "Page size",
                        "name": "page_size",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Staff response",
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffListResponse"
                        }
                    }
                }
            },
            "post": {
                "description": "Create staff",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Create staff",
                "parameters": [
                    {
                        "description": "Staff data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Staff response",
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffResponse"
                        }
                    }
                }
            }
        },
        "/staff/enums": {
            "get": {
                "description": "Get staff enums",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Get staff enums",
                "responses": {}
            }
        },
        "/staff/{id}": {
            "get": {
                "description": "Get staff by id",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Get staff by id",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Staff id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Staff response",
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffResponse"
                        }
                    }
                }
            },
            "put": {
                "description": "Update staff",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Update staff",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Staff id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Staff data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/controllers.UpdateStaffRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Staff response",
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffResponse"
                        }
                    }
                }
            },
            "delete": {
                "description": "Delete staff",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "staff"
                ],
                "summary": "Delete staff",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Staff id",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Staff response",
                        "schema": {
                            "$ref": "#/definitions/controllers.StaffResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "controllers.LoginRequest": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "controllers.LoginResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.User"
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.PatientListResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.Patient"
                    }
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.PatientRequest": {
            "type": "object",
            "required": [
                "address",
                "birth_date",
                "full_name",
                "gender",
                "identity_card",
                "phone_number"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "identity_card": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "controllers.PatientResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.Patient"
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.RegulationListResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.Regulation"
                    }
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.RegulationRequest": {
            "type": "object",
            "required": [
                "name",
                "updated_by",
                "value"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                },
                "value": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "controllers.RegulationResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.Regulation"
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.StaffListResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/models.Staff"
                    }
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.StaffRequest": {
            "type": "object",
            "required": [
                "address",
                "birth_date",
                "email",
                "full_name",
                "gender",
                "identity_card",
                "password",
                "phone_number",
                "role"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "$ref": "#/definitions/types.Gender"
                },
                "identity_card": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/types.Role"
                },
                "salary": {
                    "type": "integer"
                },
                "status": {
                    "$ref": "#/definitions/types.StaffStatus"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "controllers.StaffResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "$ref": "#/definitions/models.Staff"
                },
                "message": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.UpdatePatientRequest": {
            "type": "object",
            "required": [
                "address",
                "birth_date",
                "full_name",
                "gender",
                "identity_card",
                "phone_number"
            ],
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "identity_card": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "controllers.UpdateRegulationRequest": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                },
                "value": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "controllers.UpdateStaffRequest": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "$ref": "#/definitions/types.Gender"
                },
                "identity_card": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "role": {
                    "$ref": "#/definitions/types.Role"
                },
                "salary": {
                    "type": "integer"
                },
                "status": {
                    "$ref": "#/definitions/types.StaffStatus"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "models.Patient": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "identity_card": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "updated_at": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "models.Regulation": {
            "type": "object",
            "properties": {
                "created_at": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "updated_at": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                },
                "value": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "models.Staff": {
            "type": "object",
            "properties": {
                "address": {
                    "type": "string"
                },
                "birth_date": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "gender": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "identity_card": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "salary": {
                    "type": "integer"
                },
                "status": {
                    "type": "string"
                },
                "updated_at": {
                    "type": "string"
                },
                "updated_by": {
                    "type": "integer"
                }
            }
        },
        "models.User": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "role": {
                    "type": "string"
                }
            }
        },
        "types.Gender": {
            "type": "integer",
            "enum": [
                1,
                2,
                3
            ],
            "x-enum-varnames": [
                "Male",
                "Female",
                "Other"
            ]
        },
        "types.Role": {
            "type": "integer",
            "enum": [
                1,
                2,
                3,
                4
            ],
            "x-enum-varnames": [
                "Receptionist",
                "Doctor",
                "Pharmacist",
                "Admin"
            ]
        },
        "types.StaffStatus": {
            "type": "integer",
            "enum": [
                1,
                2
            ],
            "x-enum-varnames": [
                "Working",
                "Quit"
            ]
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8080",
	BasePath:         "/api/v1",
	Schemes:          []string{},
	Title:            "Clinic Management",
	Description:      "Clinic Management API",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
