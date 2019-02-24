import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
//import { FormGroup, FormBuilder } from "@angular/forms";
import { OnInit, Inject, Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'dialog-box',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})

export class DialogBoxComponent implements OnInit {

 // form: FormGroup;
  msg: string;
  langOK: string;

  constructor(
   // private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {
    this.langOK = data.langOK;
    this.msg = data.msg;
  }

  ngOnInit() {
    
  }


  close() {
    this.dialogRef.close();
    //this.router.navigate(['../home']);
  }
}
