import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { Router } from '@angular/router';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {
  empleado: Empleado = new Empleado();

  constructor(private empleadoServicio: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    // Aquí puedes inicializar el componente si es necesario
  }

  // Método para registrar al empleado
  guardEmpleado() {
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(
      dato => {
        console.log(dato); // Muestra la respuesta de la API
        this.irAlaListaDeEmpleados(); // Redirige a la lista de empleados
      },
      error => {
        console.log(error); // Muestra el error si la solicitud falla
      }
    );
  }

  // Método para redirigir a la lista de empleados
  irAlaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
  }

  // Método para manejar el submit del formulario
  onSubmit() {
    console.log(this.empleado); // Muestra los datos del empleado en consola
    this.guardEmpleado(); // Llama al método para registrar el empleado
  }
}