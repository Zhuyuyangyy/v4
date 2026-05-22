<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight, Info } from 'lucide-vue-next'
import type { MindMapNode } from '@/types/course'

const props = defineProps<{
  nodes: MindMapNode[]
  title?: string
  color?: string
}>()

const emit = defineEmits<{
  (e: 'nodeClick', node: MindMapNode): void
}>()

const collapsed = ref<Set<string>>(new Set())

function toggleCollapse(id: string) {
  if (collapsed.value.has(id)) {
    collapsed.value.delete(id)
  } else {
    collapsed.value.add(id)
  }
}

function isCollapsed(id: string): boolean {
  return collapsed.value.has(id)
}

function hasChildren(node: MindMapNode): boolean {
  return !!node.children && node.children.length > 0
}

function handleClick(node: MindMapNode) {
  emit('nodeClick', node)
}
</script>

<template>
  <div class="mind-map" :style="{ '--mm-clr': color ?? '#00d4ff' }">
    <!-- Header -->
    <div v-if="title" class="mm-header">
      <Info :size="13" stroke-width="1.5" />
      <span class="mm-header-title">{{ title }}</span>
    </div>

    <!-- Tree -->
    <div class="mm-tree">
      <template v-for="node in nodes" :key="node.id">
        <!-- Level 0: Root -->
        <div class="mm-branch">
          <div
            :class="['mm-node', 'lvl-root', { collapsible: hasChildren(node) }]"
            @click="handleClick(node)"
          >
            <span class="mm-label">{{ node.label }}</span>
            <span v-if="node.description" class="mm-desc-tip" :title="node.description">
              <Info :size="10" stroke-width="2" />
            </span>
          </div>

          <!-- Level 1: Children -->
          <div v-if="node.children && !isCollapsed(node.id)" class="mm-children">
            <div v-for="(child, cIdx) in node.children" :key="child.id" class="mm-branch">
              <div
                :class="['mm-node', 'lvl-1', {
                  collapsible: hasChildren(child),
                  collapsed: isCollapsed(child.id),
                }]"
                @click="handleClick(child)"
              >
                <button
                  v-if="hasChildren(child)"
                  class="mm-collapse"
                  @click.stop="toggleCollapse(child.id)"
                >
                  <ChevronRight
                    :size="12"
                    stroke-width="2"
                    :class="['mm-chevron', { rotated: !isCollapsed(child.id) }]"
                  />
                </button>
                <span class="mm-label">{{ child.label }}</span>
                <span v-if="child.description" class="mm-desc-tip" :title="child.description">
                  <Info :size="10" stroke-width="2" />
                </span>
              </div>

              <!-- Level 2: Grandchildren -->
              <div v-if="child.children && !isCollapsed(child.id)" class="mm-children">
                <div v-for="(sub, sIdx) in child.children" :key="sub.id" class="mm-branch">
                  <div
                    :class="['mm-node', 'lvl-2', {
                      collapsible: hasChildren(sub),
                      collapsed: isCollapsed(sub.id),
                    }]"
                    @click="handleClick(sub)"
                  >
                    <button
                      v-if="hasChildren(sub)"
                      class="mm-collapse"
                      @click.stop="toggleCollapse(sub.id)"
                    >
                      <ChevronRight
                        :size="10"
                        stroke-width="2"
                        :class="['mm-chevron', { rotated: !isCollapsed(sub.id) }]"
                      />
                    </button>
                    <span class="mm-label">{{ sub.label }}</span>
                  </div>

                  <!-- Level 3: Leaves -->
                  <div v-if="sub.children && !isCollapsed(sub.id)" class="mm-children">
                    <div v-for="(leaf, lIdx) in sub.children" :key="leaf.id" class="mm-branch">
                      <div class="mm-node lvl-3" @click="handleClick(leaf)">
                        <span class="mm-label">{{ leaf.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.mind-map {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px 20px;
  margin: 12px 0;
}

.mm-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--mm-clr);
}

.mm-header-title { font-family: var(--font-display); }

/* ── Tree Structure ── */
.mm-tree { display: flex; flex-direction: column; gap: 0; }
.mm-branch { display: flex; flex-direction: column; }

/* ── Node Styles ── */
.mm-node {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s var(--ease-out);
  border: 1px solid transparent;
  margin: 2px 0;
}

.mm-node:hover {
  background: color-mix(in srgb, var(--mm-clr) 4%, transparent);
  border-color: color-mix(in srgb, var(--mm-clr) 15%, transparent);
}

.mm-node.collapsible { padding-left: 6px; }

/* Level colors */
.lvl-root {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  background: color-mix(in srgb, var(--mm-clr) 6%, transparent);
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 4px;
}

.lvl-1 {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
  padding-left: 20px;
  border-left: 2px solid color-mix(in srgb, var(--mm-clr) 15%, transparent);
  margin-left: 12px;
}

.lvl-2 {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-secondary);
  padding-left: 36px;
}

.lvl-3 {
  font-size: 11px;
  font-weight: 400;
  color: var(--color-text-tertiary);
  padding-left: 52px;
}

.lvl-3:hover { color: var(--color-text-secondary); }

/* Collapse / Expand */
.mm-collapse {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  color: var(--color-text-tertiary);
  transition: all 0.2s var(--ease-out);
  flex-shrink: 0;
}

.mm-collapse:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text-primary);
}

.mm-chevron { transition: transform 0.2s var(--ease-out); }
.mm-chevron.rotated { transform: rotate(90deg); }

.mm-label { line-height: 1.4; }

.mm-desc-tip {
  color: var(--color-text-tertiary);
  opacity: 0.5;
  transition: opacity 0.2s;
  display: inline-flex;
}

.mm-node:hover .mm-desc-tip { opacity: 1; }

.mm-children {
  display: flex;
  flex-direction: column;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .lvl-2 { padding-left: 24px; }
  .lvl-3 { padding-left: 36px; }
}
</style>
