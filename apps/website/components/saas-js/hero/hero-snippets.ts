// Variant B: the diff an agent produces for "add a CSV export behind a flag".
// Lines 6-19 are the addition.
export const exportDiffCode = `export const contactsRouter = createTRPCRouter({
  byId: workspaceProcedure
    .input(z.object({ workspaceId: z.string(), id: z.string() }))
    .query(({ input }) => getContactById(input)),

  export: workspaceProcedure
    .input(z.object({ workspaceId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const enabled = await flags.getBooleanValue('export-contacts', false, {
        targetingKey: ctx.session.user.id,
        workspaceId: input.workspaceId,
      })

      if (!enabled) {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }

      return exportContactsToCsv(input.workspaceId)
    }),
})`

export const exportDiffAddedLines = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
]
