import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Feedback } from '../model/Feedback';
import { ApiService } from '../app.api.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.createForm();
  }

  createForm(){
    this.feedbackForm = this.fb.group({
      name: '',
      email: '',
      message: ['', Validators.required]
    });
  }

  onSubmit(){

    const formModel = this.feedbackForm.value;

    const fb: Feedback = {
      name: formModel.name as string,
      email: formModel.email as string,
      message: formModel.message as string
    } as Feedback;

    //console.log(fb);
  }

  ngOnInit() {
  }

}
