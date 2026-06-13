import React, { useState } from 'react';
import { CheckCircle2, Clock, Plus, Calendar, Check, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  subtitle: string;
  done: boolean;
}

const DEFAULT_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Upload 3 new Car Photo',
    subtitle: 'Completed',
    done: true,
  },
  {
    id: 't2',
    title: 'Today 10PM â€“ 11PM',
    subtitle: 'Review portfolio templates',
    done: false,
  },
  {
    id: 't3',
    title: 'Schedule Instagram Reel',
    subtitle: 'Tomorrow Â· 2:00 PM',
    done: false,
  },
];

export interface TodoWidgetProps {
  isMobile?: boolean;
}

export const TodoWidget: React.FC<TodoWidgetProps> = ({ isMobile }) => {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: 'Today Â· Just now',
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTitle('');
    setIsAdding(false);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.03)] dark:border-[var(--orbit-border-mid)] dark:bg-[var(--orbit-surface)] dark:shadow-none ${isMobile ? 'p-2.5' : 'p-5'}`}
    >
      {/* Header */}
      <div className={`${isMobile ? 'mb-2' : 'mb-5'} flex items-center justify-between`}>
        <div>
          <span
            className={`block font-mono font-bold tracking-widest text-[var(--orbit-text-muted)] uppercase ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            Planner
          </span>
          <h3
            className={`mt-0.5 font-extrabold text-[var(--orbit-text-primary)] ${isMobile ? 'text-xs' : 'text-base'}`}
          >
            To-do list
          </h3>
        </div>
        <div
          className={`flex items-center gap-1 rounded-lg bg-[var(--orbit-elevated)] ${isMobile ? 'px-1.5 py-1' : 'px-3 py-2'}`}
        >
          <Calendar size={isMobile ? 10 : 14} className="text-[var(--orbit-text-secondary)]" />
          <span
            className={`font-mono font-bold text-[var(--orbit-text-secondary)] ${isMobile ? 'text-xs' : 'text-sm'}`}
          >
            {today}
          </span>
        </div>
      </div>

      {/* Tasks List Container with Vertical Scrolling */}
      <div className="max-h-[190px] space-y-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--orbit-border-hover)]">
        {tasks.map((task) => (
          <button
            type="button"
            key={task.id}
            onClick={() => toggle(task.id)}
            className={`group flex w-full cursor-pointer items-start rounded-xl border text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--orbit-accent-primary)] ${isMobile ? 'gap-2 p-2' : 'gap-3 p-3'} ${
              task.done
                ? 'border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-500/20 dark:bg-emerald-900/20'
                : 'border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] hover:bg-[var(--orbit-elevated)]'
            }`}
          >
            <div
              className={`mt-0.5 shrink-0 transition-colors ${task.done ? 'text-emerald-500' : 'text-[var(--orbit-text-muted)] group-hover:text-[var(--orbit-text-secondary)]'}`}
            >
              {task.done ? (
                <CheckCircle2 size={isMobile ? 12 : 16} />
              ) : (
                <Clock size={isMobile ? 12 : 16} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4
                className={`font-bold ${isMobile ? 'text-xs leading-tight' : 'text-sm leading-snug'} ${
                  task.done
                    ? 'text-[var(--orbit-text-muted)] line-through'
                    : 'text-[var(--orbit-text-primary)]'
                }`}
              >
                {task.title}
              </h4>
              <p
                className={`mt-0.5 font-mono font-bold uppercase ${isMobile ? 'text-xs' : 'text-xs'} ${
                  task.done
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-[var(--orbit-text-secondary)]'
                }`}
              >
                {task.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Add Task Input Form / Button */}
      {isAdding ? (
        <form onSubmit={handleAddTask} className="mt-2.5 flex items-center gap-1.5">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Type task..."
            autoFocus
            className={`flex-1 rounded-lg border border-[var(--orbit-border-mid)] bg-[var(--orbit-surface)] px-2 outline-none focus:border-[var(--orbit-accent-primary)] ${isMobile ? 'min-h-[28px] text-xs' : 'min-h-[36px] text-xs'}`}
          />
          <button
            type="submit"
            aria-label="Add task"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--orbit-accent-primary)] text-white transition hover:bg-[#0c9594]"
          >
            <Check size={14} />
          </button>
          <button
            type="button"
            aria-label="Cancel adding task"
            onClick={() => setIsAdding(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--orbit-elevated)] text-[var(--orbit-text-secondary)] transition hover:bg-[var(--orbit-border-mid)]"
          >
            <X size={14} />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className={`mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[var(--orbit-border-mid)] font-bold text-[var(--orbit-text-secondary)] transition hover:border-[var(--orbit-accent-primary)]/50 hover:bg-[color-mix(in_srgb,var(--orbit-accent-primary)_5%,transparent)] hover:text-[var(--orbit-accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--orbit-accent-primary)] ${isMobile ? 'min-h-[30px] py-1.5 text-xs' : 'min-h-[36px] py-2 text-xs'}`}
        >
          <Plus size={isMobile ? 11 : 14} />
          Add new task
        </button>
      )}
    </div>
  );
};

export default TodoWidget;
