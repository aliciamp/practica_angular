import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contact } from "./../contact";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }

  //Array de los colores
  colors = [
    { id: 1, value: 'Rojo' },
    { id: 2, value: 'Azul' },
    { id: 3, value: 'Amarillo' },
    { id: 4, value: 'Verde' },
    { id: 5, value: 'Morado' },
    { id: 6, value: 'Negro' },
    { id: 7, value: 'Amarillo' },
    { id: 8, value: 'Rosa' }
  ];

  //Array de los gender
  sexos = [
    { id: 1, value: 'Mujer' },
    { id: 2, value: 'Otro' },
    { id: 3, value: 'Otro' },
    { id: 4, value: 'Prefiero no decirlo' }
  ];

  //Array que contiene todos los contactos
  contactList: Array<Contact> = []

  //Estructura del nuevo contacto
  contact: any = {
    nombre: "",
    apellido: "",
    edad: null,
    id: "",
    cumpleaños: new Date(),
    color: "",
    sexo: ""
  }

  //Variables para diferenciar nuevo contacto y editar contacto
  action: String = "new"; //Podrá ser nuevo o editar
  contactIndex: any = 0; //Número del contacto que se edita

  //Añadimos / Editamos contacto
  addContact(): void {
    //Validamos la fecha
    let cumple = new Date(this.contact.birthday);
    let dia = cumple.getDay();
    let mes = cumple.getMonth();
    let año = cumple.getFullYear();

    this.contact.birthday = `${dia}/${mes}/${año}`

    if (this.action == "new") { //Si es un nuevo contacto...
      if (parseInt(this.contact.edad) > 0 && parseInt(this.contact.edad) <= 125) {
        this.contactList.push(this.contact); //Añádelo a la lista de contactos

        this.contact = { //Limpia los imputs
          nombre: "",
          apellido: "",
          edad: null,
          id: "",
          cumple: "",
          color: "",
          sexo: ""
        }
      } else {
        alert("La edad tiene que ser un número entre 1 y 125");
      }

    } else { //Si es editamos contacto...
      this.contactList[this.contactIndex] = this.contact; //Actualízalo
      this.action = "new";

      this.contact = { //Limpia los imputs
        nombre: "",
        apellido: "",
        edad: null,
        id: "",
        cumple: "",
        color: "",
        sexo: ""
      }
    }
  }

  //Eliminar contacto
  delete(deleteIndex: number): void {
    this.contactList.splice(deleteIndex, 1);
  }

  //Editar contacto
  edit(editIndex: number): void {
    this.contact = this.contactList[editIndex];
    this.action = "edit";
    this.contactIndex = editIndex;
  }

}