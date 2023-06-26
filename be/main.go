// package main

// import (
// 	"clinic-management/models"
// 	"clinic-management/routes"
// 	"log"
// 	"os"
// 	"time"

// 	"github.com/gin-gonic/gin"
// 	"github.com/joho/godotenv"
// )

// // @title Clinic Management
// // @description Clinic Management API
// // @version 1.0
// // @host localhost:8080
// // @schemes http https
// // @BasePath /api/v1
// func main() {
// 	err := godotenv.Load(".env")
// 	if err != nil {
// 		log.Fatalf("Error loading .env file")
// 	}

// 	gin.SetMode(os.Getenv("GIN_MODE"))

// 	configTimezone()

// 	models.ConnectDB()

// 	r := gin.Default()
// 	routes.Config(r)

// 	port := os.Getenv("SV_PORT")
// 	r.Run(":" + port)
// }

//	func configTimezone() {
//		loc, err := time.LoadLocation("Asia/Ho_Chi_Minh")
//		if err != nil {
//			log.Fatalf(err.Error())
//		}
//		time.Local = loc
//	}
package main

import (
	"io/ioutil"
	"log"

	generator "github.com/angelodlfrtr/go-invoice-generator"
)

func main() {
	doc, _ := generator.New(generator.Invoice, &generator.Options{
		CurrencySymbol: "vnd ",
	})

	doc.SetRef("1")
	doc.SetDate("02/03/2021")

	logoBytes, _ := ioutil.ReadFile("./assets/logo.png")

	doc.SetCompany(&generator.Contact{
		Name: "Clinicly",
		Logo: logoBytes,
		Address: &generator.Address{
			Address:    "227 Nguyen Van Cu, Phuong 4, Quan 5",
			PostalCode: "800000",
			City:       "Ho Chi Minh",
			Country:    "Vietnam",
		},
	})

	doc.SetCustomer(&generator.Contact{
		Name: "Test Customer",
		Address: &generator.Address{
			Address: "89 Rue de Paris",
		},
	})

	for i := 0; i < 3; i++ {
		doc.AppendItem(&generator.Item{
			Name:        "Cupcake ipsum dolor sit amet bonbon, coucou bonbon lala jojo, mama titi toto",
			Description: "Cupcake ipsum dolor sit amet bonbon, Cupcake ipsum dolor sit amet bonbon, Cupcake ipsum dolor sit amet bonbon",
			UnitCost:    "99876.89",
			Quantity:    "2",
		})
	}

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "99876.89",
		Quantity: "2",
	})

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "3576.89",
		Quantity: "2",
	})

	doc.AppendItem(&generator.Item{
		Name:     "Test",
		UnitCost: "889.89",
		Quantity: "2",
	})

	pdf, err := doc.Build()
	if err != nil {
		log.Fatal(err)
	}

	err = pdf.OutputFileAndClose("out.pdf")

	if err != nil {
		log.Fatal(err)
	}
}
