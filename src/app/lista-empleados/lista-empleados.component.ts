import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: Empleado[] = []; 
  errorMessage: string | null = null; 

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router  // Inyecta Router
  ) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  // Navegar a la página de actualización de empleado
  actualizarEmpleado(id: number) {
    this.router.navigate(['actualizar-empleado', id]);
  }
  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoServicio.eliminarEmpleado(id).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(empleado => empleado.id !== id); // Elimina de la lista localmente
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el empleado. Por favor, inténtelo de nuevo más tarde.';
          console.error('Error:', error);
        }
      });
    }
  }

  // Obtener la lista de empleados desde el servicio
  private obtenerEmpleados(): void {
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe({
      next: (dato) => {
        this.empleados = dato; 
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los empleados. Por favor, inténtelo de nuevo más tarde.';
        console.error('Error:', error); 
      }
    });
  }
}
