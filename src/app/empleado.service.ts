import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  
  private baseUrl = "http://localhost:8080/api/v1/empleados";

  constructor(private httpCliente: HttpClient) { }

  // Obtener lista de empleados
  obtenerListaDeEmpleados(): Observable<Empleado[]> {
    return this.httpCliente.get<Empleado[]>(`${this.baseUrl}`);
  }

  // Registrar un empleado
  registrarEmpleado(empleado: Empleado): Observable<Object> {
    return this.httpCliente.post(`${this.baseUrl}`, empleado);
  }

  // Actualizar un empleado
  actualizarEmpleado(id: number, empleado: Empleado): Observable<Object> {
    return this.httpCliente.put(`${this.baseUrl}/${id}`, empleado);
  }
  obtenerEmpleadoPorId(id: number): Observable<Empleado> {
    return this.httpCliente.get<Empleado>(`${this.baseUrl}/${id}`);
  }


  // Eliminar un empleado
  eliminarEmpleado(id: number): Observable<Object> {
    return this.httpCliente.delete(`${this.baseUrl}/${id}`);
  }
}
