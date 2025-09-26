<script setup lang="ts">
import type { CollectionEntry } from "astro:content";
import { groupBy } from "es-toolkit";
import { computed, ref } from "vue";

const homeworkList: CollectionEntry<"homework">[] = await fetch(
  "/api/homework"
).then((res) => res.json());
const byFolder = groupBy([...homeworkList], (hw) => hw.id.split("/", 2)[0]);

const getUrl = (id: string) => `/homework/${id}`;

function formatDate(date: any) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const sortedFolders = Object.entries(byFolder).sort(([a], [b]) =>
  a.localeCompare(b)
);

function sortedHomeworks(homeworks: typeof homeworkList) {
  return [...homeworks].sort((a, b) => a.id.localeCompare(b.id));
}

const [firstFolder] = Object.keys(byFolder).sort();
const activeFolder = ref(firstFolder);

const sortedHomeworksByDate = computed(() => {
  const homeworks = byFolder[activeFolder.value] || [];
  return [...homeworks].sort((a, b) => {
    const aDate = a.data.date;
    const bDate = b.data.date;
    // Sort undated files to the bottom
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });
});
</script>

<template>
  <section class="bg-dynamic min-h-screen">
    <div class="flex max-w-[1800px] mx-auto p-12">
      <!-- Sidebar -->
      <aside
        class="w-64 border-r border-neutral-400 dark:border-neutral-600 space-y-2"
      >
        <h2 class="font-display-sans font-bold text-xl tracking-wide mb-4">
          Folders
        </h2>
        <ul>
          <li
            v-for="([folder, homeworks], index) in sortedFolders"
            :key="index"
            class="mb-2"
          >
            <details
              :open="folder === activeFolder"
              class="group"
              @toggle="
                (event) => {
                  const details = event.target! as HTMLDetailsElement;
                  if (details.open) {
                    activeFolder = folder;
                  }
                }
              "
            >
              <summary
                :class="[
                  'cursor-pointer font-semibold text-neutral-800 dark:text-neutral-200',
                  'hover:underline underline-offset-4',
                  folder === activeFolder && 'underline',
                ]"
              >
                {{ folder }}
              </summary>
              <ul class="pl-4 mt-1 space-y-1">
                <li v-for="hw in sortedHomeworks(homeworks)" :key="hw.id">
                  <a
                    :href="getUrl(hw.id)"
                    :class="[
                      'block text-sm text-blue-600 dark:text-blue-300',
                      'hover:text-blue-800 dark:hover:text-blue-400',
                      'hover:underline underline-offset-4',
                    ]"
                  >
                    {{ hw.data.title }}
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-8">
        <h2 class="font-display-sans font-bold text-3xl tracking-wide mb-6">
          Files
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr
                class="border-b border-neutral-400 dark:border-neutral-600 text-left"
              >
                <th class="py-2 px-3 font-semibold">Name</th>
                <th class="py-2 px-3 font-semibold">Date Modified</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="hw in sortedHomeworksByDate"
                :key="hw.id"
                class="border-b border-neutral-200 dark:border-neutral-700"
              >
                <td class="py-2 px-3">
                  <a
                    :href="getUrl(hw.id)"
                    class="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-400 hover:underline underline-offset-4"
                  >
                    {{ hw.data.title }}
                  </a>
                </td>
                <td
                  class="py-2 px-3 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {{ formatDate(hw.data.date) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </section>
</template>
