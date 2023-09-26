import { Role } from '../../models/repoModels/Role.model';
import { injectable } from 'inversify';
import * as admin from 'firebase-admin';
import { RoleInterfaceRepository } from '../interfaces/roleInterface.repository';

@injectable()
export class RoleRepository implements RoleInterfaceRepository {
  public DB: admin.firestore.Firestore;

  constructor() {
    this.DB = admin.firestore();
  }

  public async addRole(role: Role): Promise<any> {
    let exists: any = await this.DB.collection('Todo/' + role.todoId + '/Role')
      .where('userId', '==', role.userId)
      .get();
    let roles: any = await this.DB.collection(
      'Todo/' + role.todoId + '/Role',
    ).get();
    let entries1: any = [];
    let entries2: any = [];

    exists.forEach((document: any) => {
      const entry = document.data();

      entries1.push(entry);
    });
    roles.forEach((document: any) => {
      const entry = document.data();

      entries2.push(entry);
    });

    if (entries1.length > 0) {
      return {
        message: 'This user role already exists in this todo!',
        success: false,
      };
    }

    let result: any = await this.DB.collection(
      'Todo/' + role.todoId + '/Role',
    ).add(role);

    await this.DB.collection('Todo/' + role.todoId + '/Role')
      .doc(result.id)
      .update({ id: result.id });

    result = await result.get();
    result = result.data();

    if (entries2.length === 0) {
      return { result, message: 'New Todo added!', success: true };
    } else {
      return { result, message: 'New role added!', success: true };
    }
  }

  public async updateRole(
    role: Role,
    id: string,
    todoId: string,
  ): Promise<any> {
    await this.DB.collection('Todo/' + todoId + '/Role')
      .doc(id)
      .update(role);

    let doc: any = await this.DB.collection('Todo/' + todoId + '/Role')
      .doc(id)
      .get();

    doc = doc.data();

    return doc;
  }

  //   public async getTodos(): Promise<any> {
  //     try {
  //       const subTodoResults = await this.DB.collectionGroup('SubTodo').get();
  //       const todoResults = await this.DB.collection('Todo').get();
  //       let entries1: any = [];
  //       let entries2: any = [];

  //       todoResults.forEach((doc) => {
  //         const entry = doc.data();

  //         entries1.push(entry);
  //       });
  //       subTodoResults.forEach(async (doc) => {
  //         const entry = doc.data();

  //         entries2.push(entry);
  //       });
  //       entries1.forEach(async (doc1: MergedTodo) => {
  //         entries2.forEach(async (doc2: SubTodo) => {
  //           if (doc1.id === doc2.todoId) {
  //             if (doc1.subTodos) {
  //               doc1.subTodos.push(doc2);
  //             } else {
  //               doc1.subTodos = [doc2];
  //             }
  //           }
  //         });
  //       });

  //       return entries1;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   public async getTodo(id: string): Promise<any> {
  //     let doc: any = await this.DB.collection('Todo').doc(id).get();
  //     let subDoc: any = await this.DB.collection('Todo/' + id + '/SubTodo').get();
  //     let entries: any = [];

  //     doc = doc.data();
  //     subDoc.forEach((document: any) => {
  //       const entry = document.data();

  //       entries.push(entry);
  //     });

  //     return { Todo: doc, SubTodos: entries };
  //   }
}
