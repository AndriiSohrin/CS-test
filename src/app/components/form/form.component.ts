import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {CarOwnerService} from "../../services/car-owner.service";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() formData: any;
  @Input() status!: string;
  @Output() submitEmit: EventEmitter<any> = new EventEmitter<any>()
  carsForm!: FormGroup;
  carsQuantity: number = 1

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.formData, 11)
    this.formInit()
  }

  formInit(): void {
    this.carsForm = this.formBuilder.group({
      name: [this.formData.name, Validators.compose([Validators.required, Validators.maxLength(30)])],
      surname: [this.formData.surname, Validators.compose([Validators.required, Validators.maxLength(30)])],
      patronymic: [this.formData.patronymic, Validators.compose([Validators.required, Validators.maxLength(30)])],
      cars: new FormArray([]),
    })

    for (let i = 0; i < this.formData.cars.length; i++) {
      if (this.formData.cars.length != 0) {
        this.t.push(this.formBuilder.group({
          stateNumbers: [this.formData.cars[i].stateNumbers, Validators.compose([Validators.required])],
          manufacturer: [this.formData.cars[i].manufacturer, Validators.compose([Validators.required])],
          model: [this.formData.cars[i].model, Validators.compose([Validators.required])],
          year: [this.formData.cars[i].year, Validators.compose([Validators.required])],
        }))
      }
    }


  }

  get f() {
    return this.carsForm.controls;
  }

  get t() {
    return this.f.cars as FormArray;
  }

  oneMoreCars() {
    this.t.push(this.formBuilder.group({
      stateNumbers: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      manufacturer: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      model: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      year: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    }));
    this.carsQuantity = this.carsQuantity + 1;
  }

  deleteCar(index: number) {
    this.t.removeAt(index);
    this.carsQuantity = this.carsQuantity - 1;
  }

  save() {
    console.log(this.carsForm);
    this.submitEmit.emit(this.carsForm.value)
  }
}
