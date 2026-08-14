import { ComponentsRegistryConfig, RegistryIndexItem, RegistryItem, REGISTRY_SCHEMA_VERSION } from '@saas-ui/registry/schema';
export { RegistryIndexItem, RegistryItem, isRegistryItemTypeInstallable } from '@saas-ui/registry/schema';
import { z } from 'zod';

interface EffectivePathMapping {
    targets: string[];
    sourcePath: string;
}
interface EffectiveTsConfig {
    configPath: string;
    document: Record<string, unknown>;
    baseUrl: string;
    hasExplicitBaseUrl: boolean;
    paths: Record<string, EffectivePathMapping>;
}

type RegistryConfig = ComponentsRegistryConfig;
declare const rawConfigSchema: z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    system: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        chakra: "chakra";
        panda: "panda";
    }>>>;
    style: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    rsc: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    tsx: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    installed: z.ZodDefault<z.ZodArray<z.ZodString>>;
    registries: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        url: z.ZodString;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>]>>>;
    aliases: z.ZodObject<{
        components: z.ZodString;
        utils: z.ZodString;
        ui: z.ZodOptional<z.ZodString>;
        lib: z.ZodOptional<z.ZodString>;
        hooks: z.ZodOptional<z.ZodString>;
        icons: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    icons: z.ZodOptional<z.ZodObject<{
        outputDir: z.ZodOptional<z.ZodString>;
        defaultIconSet: z.ZodOptional<z.ZodString>;
        iconSize: z.ZodOptional<z.ZodString>;
        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strict>;
type RawConfig = z.infer<typeof rawConfigSchema>;
declare const configSchema: z.ZodObject<{
    $schema: z.ZodOptional<z.ZodString>;
    system: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        chakra: "chakra";
        panda: "panda";
    }>>>;
    style: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    rsc: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    tsx: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    installed: z.ZodDefault<z.ZodArray<z.ZodString>>;
    registries: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        url: z.ZodString;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        params: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strict>]>>>;
    aliases: z.ZodObject<{
        components: z.ZodString;
        utils: z.ZodString;
        ui: z.ZodOptional<z.ZodString>;
        lib: z.ZodOptional<z.ZodString>;
        hooks: z.ZodOptional<z.ZodString>;
        icons: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    icons: z.ZodOptional<z.ZodObject<{
        outputDir: z.ZodOptional<z.ZodString>;
        defaultIconSet: z.ZodOptional<z.ZodString>;
        iconSize: z.ZodOptional<z.ZodString>;
        aliases: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, z.core.$strip>>;
    resolvedPaths: z.ZodObject<{
        cwd: z.ZodString;
        utils: z.ZodString;
        components: z.ZodString;
        lib: z.ZodString;
        hooks: z.ZodString;
        ui: z.ZodString;
        icons: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strict>;
type Config = z.infer<typeof configSchema>;
declare function resolveConfigPaths(cwd: string, config: RawConfig, effectiveConfig?: EffectiveTsConfig): Promise<{
    system: "chakra" | "panda";
    style: string;
    rsc: boolean;
    tsx: boolean;
    installed: string[];
    aliases: {
        components: string;
        utils: string;
        ui?: string | undefined;
        lib?: string | undefined;
        hooks?: string | undefined;
        icons?: string | undefined;
    };
    resolvedPaths: {
        cwd: string;
        utils: string;
        components: string;
        lib: string;
        hooks: string;
        ui: string;
        icons: string;
    };
    $schema?: string | undefined;
    registries?: Record<string, string | {
        url: string;
        headers?: Record<string, string> | undefined;
        params?: Record<string, string> | undefined;
    }> | undefined;
    icons?: {
        outputDir?: string | undefined;
        defaultIconSet?: string | undefined;
        iconSize?: string | undefined;
        aliases?: Record<string, string> | undefined;
    } | undefined;
}>;

type RegistryConfigs = Readonly<Record<string, RegistryConfig>>;
interface RegistryRequestOptions {
    headers?: Record<string, string>;
    /** Safe identifier used in errors instead of a credential-bearing URL. */
    label?: string;
}

interface RegistryClient {
    getIndex(): Promise<RegistryIndexItem[]>;
    getItem(reference: string, style: string, request?: RegistryRequestOptions): Promise<RegistryItem>;
    getJson?(resource: string): Promise<unknown>;
}
type RegistryJsonFetcher = (resource: string, request?: RegistryRequestOptions) => Promise<unknown>;
declare function isRegistryUrl(value: string): boolean;
declare function createRegistryClient(fetchJson: RegistryJsonFetcher): RegistryClient;

interface DependencyInstallRequest {
    cwd: string;
    dependencies: string[];
    devDependencies: string[];
}
type DependencyInstaller = (request: DependencyInstallRequest) => Promise<void>;

type InstallMode = 'add' | 'update';
type PlannedFileAction = 'create' | 'update' | 'unchanged' | 'conflict';
interface InstallConflict {
    kind: 'collision' | 'dependency-classification' | 'dependency-version' | 'existing' | 'exclusive-selection' | 'unsafe-path';
    target: string;
    items: string[];
    message: string;
}
interface PlannedInstallFile {
    item: string;
    source: string;
    target: string;
    absoluteTarget: string;
    content: string;
    hash: string;
    previousHash?: string;
    action: PlannedFileAction;
}
interface PlannedInstallItem {
    reference: string;
    name: string;
    version?: string;
    contentHash: string;
    exclusiveGroup?: string;
    conflicts?: string[];
    registryDependencies: string[];
    files: PlannedInstallFile[];
}
interface InstallPlan {
    schemaVersion: typeof REGISTRY_SCHEMA_VERSION;
    style: string;
    mode: InstallMode;
    requestedItems: string[];
    transitiveItems: string[];
    replacedItems: string[];
    items: PlannedInstallItem[];
    dependencies: string[];
    devDependencies: string[];
    conflicts: InstallConflict[];
    files: PlannedInstallFile[];
    docs: string[];
}
interface CreateInstallPlanOptions {
    client?: RegistryClient;
    overwrite?: boolean;
    force?: boolean;
    mode?: InstallMode;
    dependencies?: string[];
    devDependencies?: string[];
}
interface ApplyInstallPlanOptions {
    /**
     * Dependency installers mutate package-manager state outside the file
     * transaction. A successful dependency install cannot be rolled back if a
     * later file commit fails. Implementations must be idempotent.
     */
    dependencyInstaller?: DependencyInstaller;
    silent?: boolean;
    transaction?: InstallTransactionOptions;
    stagedProjectFiles?: readonly StagedProjectFile[];
}
type ProjectFileExpectation = {
    exists: false;
} | {
    exists: true;
    hash: string;
};
interface StagedProjectFile {
    /** Absolute path inside the configured project root. */
    absoluteTarget: string;
    content: string;
    /** State captured before planning; apply rechecks it under the writer lock. */
    expected: ProjectFileExpectation;
}
interface AppliedProjectFile {
    absoluteTarget: string;
    target: string;
    hash: string;
    action: Extract<PlannedFileAction, 'create' | 'update' | 'unchanged'>;
}
interface InstallTransactionOptions {
    lockTimeoutMs?: number;
    lockPollMs?: number;
    staleLockMs?: number;
    onPhase?: (phase: 'locked' | 'dependencies-installed' | 'before-commit' | 'files-committed' | 'committed' | 'rollback') => void | Promise<void>;
}

interface InstallRegistryItemsOptions extends CreateInstallPlanOptions, ApplyInstallPlanOptions {
    dryRun?: boolean;
    diff?: string;
    silent?: boolean;
    isNewProject?: boolean;
}
declare function installRegistryItems(items: readonly string[], config: Config, options?: InstallRegistryItemsOptions): Promise<{
    plan: InstallPlan;
    applied: false;
    result?: undefined;
} | {
    plan: InstallPlan;
    result: {
        created: PlannedInstallFile[];
        updated: PlannedInstallFile[];
        unchanged: PlannedInstallFile[];
        projectFiles: AppliedProjectFile[];
    };
    applied: true;
}>;

declare function hashContent(content: string | Buffer): string;

interface ResolvedRegistryGraph {
    requested: string[];
    requestedReferences: string[];
    items: RegistryItem[];
    itemReferences: string[];
    transitive: string[];
    transitiveReferences: string[];
    dependencies: Record<string, string[]>;
    dependenciesByReference: Record<string, string[]>;
}
declare function resolveRegistryGraph(requested: readonly string[], style: string, client: RegistryClient, registries?: RegistryConfigs): Promise<ResolvedRegistryGraph>;

export { type DependencyInstallRequest, type DependencyInstaller, type RegistryClient, createRegistryClient, hashContent, installRegistryItems, isRegistryUrl, resolveConfigPaths, resolveRegistryGraph };
