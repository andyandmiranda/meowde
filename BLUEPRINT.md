# MEOWDE Blueprint — curriculum-first vNext (2026-11-05)

Status: curriculum contract / incremental implementation, **not** a claim that the full learning path is shipped.
Design baseline: Git commit `9f953b5f70407a9306f79275da2e7d5a96eaeec4`, especially the ML connected learning-node map. Maintain shared header, five tabs (Home, Learn, Deepen, Together, My), and common Home/Together/My while keeping subject-specific learning engines.

## Product outcome & scope
A novice can progress inside MEOWDE from Python fundamentals to independently implementing, training, debugging, evaluating, saving and reloading a small PyTorch neural network, and explain model limitations. This is an **outcome target**, not a current capability. Browser-only static pages do not yet provide a full PyTorch GPU runtime; real code execution environments need explicit implementation and testing. Do not mislabel multiple-choice completion as model-building proficiency.

## Verified starting inventory
- Python: existing approximately 30-lesson map, Pyodide execution for Python exercises; advanced coding proficiency **not established**.
- Linux: existing 12-unit basics with other E1–E9 materials, simulator (not a real shell); environment setup proficiency **not established**.
- ML: four foundational models (linear, logistic, kNN, naive Bayes) and scoring; no demonstrated end-to-end scikit-learn training.
- DL: **17 introduction units**, exactly **51 check/apply/recall questions**, storage `meowde-deep-foundations-v1`. This is **DL introduction**, not practical model training.
- Keep approved ML map geometry, states, spacing and palette. Apply shared shell without redesigning the approved map.

## Prerequisite graph, learning stages, and evidence
| Stage | Prerequisites | Core capabilities | Realistic exit evidence |
| --- | --- | --- | --- |
| P1 Python | none | values, control flow, functions, collections, errors, files, modules, basic OOP | independently code, run and repair a multi-function program against hidden tests |
| P2 Linux + dev tools | P1 selected units | paths, permissions, command-line, virtual environments, Git, installing dependencies | reproduce a project setup and diagnose a broken environment; simulator tasks explicitly labelled simulation |
| P3 data + maths bridge | P1, selected P2 | NumPy/Pandas, plots, vectors/matrices, derivatives, probability, evaluation splits | calculate shapes and simple gradients, prepare a dataset without leakage |
| P4 applied ML | P3 | preprocessing, training/validation/test, regression/classification, metrics, overfit and reproducibility | train and compare two sklearn models; report baseline, validation and held-out test |
| P5 DL foundation | P3-P4 | current 17 DL units, tensor, forward, loss, backprop, optimizer, loops | complete existing 51 questions **plus** manually work through gradient and verify a train step |
| P6 PyTorch + capstone | P5 | Dataset/DataLoader, nn.Module, autograd, loss/optimizer, CPU/GPU portability, train/eval, debugging, checkpoints, inference; later CNN + transformer/fine-tuning | write and run a repeatable train/validation/test pipeline, improve baseline, explain learning curves, save/load model, perform inference on new data |

Do not add more top-level subject tabs for prerequisite modules; map them as connected units inside learning paths. Scoring and unlocking must depend on real evidence, not attendance or number of clicks.

## Five-step lesson contract
1. **Concept**: explain one learning objective, prerequisite and common misconception in plain Korean.
2. **Worked example**: annotate a trace or runnable example, with input → state → output.
3. **Guided practice**: learner predicts/edits a small component with targeted feedback.
4. **Independent application**: new problem with executable tests or numeric validation; errors explain *why* and how to retry.
5. **Retrieval & spaced review**: answer without hints; resurface previously missed skills after delays. Record attempts only after a tested migration scheme.

Never silently inflate legacy `done` into newly introduced stages. Use separate evidence for skill validation, and design migrations before adding new persistent state.

## DL practical progression (preserve all 17 × 3 introduction questions)
- D0: first controlled in-browser **forward → squared-error → gradient-update** experiment; numeric deterministic feedback, **no storage writes**. Does not claim to execute PyTorch.
- D1: tensors/shapes, broadcasting, train/eval switches and manual gradients.
- D2: PyTorch autograd, `nn.Module`, loss, optimizer, train loop; actual runnable execution must be validated in a suitable environment.
- D3: dataset split/metrics and leakage tests; reproducible seeded model, overfitting diagnosis.
- D4: persistence (`state_dict` save/load), inference and environment troubleshooting.
- D5: CNN/transfer learning, transformer basics, and one small end-to-end independent project with an error-analysis report.

Project acceptance: at least one independently completed, executable PyTorch project, held-out test metrics, documented baseline/comparison, reproducible seed/environment, save/reload inference equivalence, and a deliberate debugging task. No claim of DL mastery without observation.

## Existing educational gaps, ranked
P0: 51 introductory DL choices cannot verify code execution, gradient debugging, real PyTorch training; ML lacks full model fitting/evaluation; learning outcomes not yet demonstrable.
P1: explicit Python → mathematics/data → ML → DL prerequisite bridges, 5-step practice evidence, actionable error feedback and spaced review.
P1: subject-shell consistency and 320px mobile QA, including stable approved ML map.
P2: later deep architectures, benchmarking, accessibility/language polish.

## Implementation boundaries
- Existing branch `chat/common-shell-nav-20261105` only; use existing PASS evidence. No main, Production, CI, expense, or real user-record mutation.
- Keep all existing lesson IDs/content, grading engines, keys and completion semantics intact.
- Add practical exercises beside, not in place of, the existing DL intro. Initial D0 lab is **read-only/nonpersistent** and safely linkable from DL Deepen.
- Test one changed feature at a time via static content checks and, when reachable, single-run real-browser QA at 320px and save/reentry. Separate PASS from NOT RUN.
- No repeated Blueprint versions or speculative progress percentages. This file is the single curriculum contract; amend it only after a verified educational change.
