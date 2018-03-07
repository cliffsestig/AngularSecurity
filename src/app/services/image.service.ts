import { Http,Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
@Injectable()
export class imageService
{
    private headers = new Headers({ 'Content-Type': 'multipart/form-data;',
    "Authorization": environment.apiKeyImgur });
    constructor(private http: Http) {
      
	}
	post(image): Promise<JSON> {
		// this.http.post("https://api.imgur.com/3/image", image, { headers: this.headers })
		// 	.map((response) => response.json())
		// 	.subscribe((result: any) => {
        //        this.lastPost = result['data']
        // 	});
        return this.http.post("https://api.imgur.com/3/image", image, { headers: this.headers })
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(error => {
                    return (error);
                }
            );
    }
    
}