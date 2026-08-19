# Accessibility

## Principles

The visual serves Persian/RTL users without making keyboard or assistive-technology behavior depend on visual direction.

## Current requirements

- Use native `<button>` controls for interactive actions.
- Provide accessible labels for the date trigger and clear action.
- Keep focusable controls reachable in logical order.
- Do not communicate invalid/disabled state using color alone.
- Preserve readable contrast in normal Power BI themes.
- Keep RTL text direction explicit for Persian UI.
- Avoid tiny hit targets for the primary trigger.
- Do not autoplay or open the modal without a direct user action.

## Modal behavior

Power BI owns the modal frame and its action buttons. The calendar is opened only from an explicit click, consistent with Microsoft's dialog guidance.

## Manual accessibility checks

Before major releases:

1. Navigate to the trigger with keyboard only.
2. Activate the dialog without a mouse.
3. Confirm visible focus within calendar interaction.
4. Verify the clear action has an accessible name.
5. Check disabled and invalid-field messages at 200% zoom.
6. Verify RTL text does not reverse icon/button semantics.

## Future work

Formal screen-reader test cases and automated accessibility scanning should be added when the UI surface expands beyond the current compact control.
