# 🛒 POS Frontend Rules (vitePos)

This document governs the development of the React/Vite Point of Sale (POS) application.

## 🎨 Interface & Styling [Design DNA]

- **Main Theme:** **Enterprise UX / SAP Fiori Horizon** (Industrial/Technical style).
- **Icons:** Use `lucide-react` exclusively.
- **UI Components:** Default to `MUI` (Material-UI). Use `shadcn/ui` ONLY if explicitly instructed.
- **Styling:** Use `Tailwind CSS`. NO plain CSS/SCSS or inline styles unless strictly necessary.

### 📐 Rules of Design (JARVIS Reference):
1. **Sharp Edges:** Avoid rounded corners. Use `borderRadius: '4px'` or `0` for professional precision.
2. **Technical Palette:** 
   - **Primary SAP Blue:** `#005483` (Authority and trust).
   - **Neutrals:** `#f8fafc` for workspace backgrounds, `#ffffff` for cards/sheets.
   - **Status Contrasts:** Technical red and green for states and totals.
3. **Information Density:** Design for high data density (Lean Design) so the user processes information easily.
4. **SAP Standard Inputs:** Use `variant="filled"` on MUI `TextField` for bulk-editing forms; improves readability on dense screens.
5. **Typographical Hierarchy:** Heavy weights (`fontWeight: 800/900`) for critical values; small muted text for metadata (captions).
6. **Selection and States:** Use thick left borders (e.g., `borderLeft: '4px solid #005483'`) to show selection in lists or slim cards.
7. **Info Banners:** Use information boxes with colored left borders to explain automatic operations.

---

## 🏗 Architecture Conventions

- **Inversify.js Container:** Dependency injection is handled via `container.get(TYPES.*)`.
- **Repository Memoization:** Whenever resolving a repository inside a custom hook or component, you **MUST** wrap the container resolution in `useMemo` to ensure stable references and avoid infinite re-render loops (e.g. `const repository = useMemo(() => container.get<IPartnerRepository>(TYPES.IPartnerRepository), [])`).
- **Entities:** Focus on domain state and business logic.
- **WriteData Shape & Mappers:** Use `*WriteData` transport interfaces and convert them to DTOs in infrastructure mappers.
- **Repositories:** Must receive domain objects (Entities), NOT transport-specific DTOs.

---

## 🛡️ Mandatory Validations
Before finishing any task, the following tools MUST be executed:
- **React Components:** After creating or refactoring components in `vitePos`, you MUST run `react-doctor`.
  - Command: `npx -y react-doctor@latest . --verbose --diff`
  - Criterion: Code is not considered "done" until the score is > 95 or issues are justified.

---

## 🛠 Skills & Workflows
- **Skill:** [vercel-react-best-practices](file:///Users/anthonylaverde/Desktop/erp_anthony_daniel/.agents/skills/vercel-react-best-practices/SKILL.md)
- **Skill:** [react-doctor](file:///Users/anthonylaverde/Desktop/erp_anthony_daniel/.agents/skills/react-doctor/SKILL.md)
