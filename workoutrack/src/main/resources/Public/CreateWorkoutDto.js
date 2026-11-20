class WorkoutSetDto {
  constructor({ exerciseId, setNumber, weight, reps }) {
    this.exerciseId = Number(exerciseId);
    this.setNumber = Number(setNumber);
    this.weight = Number(weight);
    this.reps = Number(reps);
  }
}

class CreateWorkoutDto {
  constructor({ typeId, notes, sets = [] }) {
    this.typeId = Number(typeId);
    this.notes = notes && notes.trim() ? notes.trim() : null;
    this.sets = sets.map((s) => (s instanceof WorkoutSetDto ? s : new WorkoutSetDto(s)));
  }

  toJson() {
    return JSON.stringify({
      typeId: this.typeId,
      notes: this.notes,
      sets: this.sets,
    });
  }
}