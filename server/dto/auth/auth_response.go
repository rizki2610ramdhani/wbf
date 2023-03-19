package authdto

type LoginResponse struct {
	ID 		int 	`json:"id"`
	Name	string	`json:"name"`
	IsAdmin bool   	`json:"is_admin"`
	Email 	string 	`json:"email"`
	Token 	string 	`json:"token"`
}
