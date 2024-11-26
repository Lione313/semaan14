import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent implements OnInit {

  id: number;
  empleado: Empleado = new Empleado();

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.empleadoService.obtenerEmpleadoPorId(this.id).pipe(
      tap(dato => {
        this.empleado = dato;
      }),
      catchError(error => {
        console.error('Error al obtener el empleado:', error);
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe();
  }

  // Método para navegar a la lista de empleados
  irAlaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.empleado) {
      this.empleadoService.actualizarEmpleado(this.id, this.empleado).pipe(
        tap(dato => {
          this.irAlaListaDeEmpleados(); // Redirige al finalizar la actualización
        }),
        catchError(error => {
          console.error('Error al actualizar el empleado:', error);
          return of(null); // Retorna un observable vacío en caso de error
        })
      ).subscribe(); // Realiza la suscripción para ejecutar la acción
    }
  }
}
