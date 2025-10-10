import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    taskKey = 'tasks';

    saveTasks(list: any) {
        localStorage.setItem(this.taskKey, JSON.stringify(list));
    }

    getTasks() {
        let tasks = localStorage.getItem(this.taskKey);
        return tasks ? JSON.parse(tasks) : [];
    }


}