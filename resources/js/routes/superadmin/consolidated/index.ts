import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/superadmin/consolidated-results',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::index
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:17
 * @route '/superadmin/consolidated-results'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/superadmin/consolidated-results/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
    const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
        exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Superadmin\ConsolidatedResultController::exportMethod
 * @see app/Http/Controllers/Superadmin/ConsolidatedResultController.php:44
 * @route '/superadmin/consolidated-results/export'
 */
        exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const consolidated = {
    index: Object.assign(index, index),
export: Object.assign(exportMethod, exportMethod),
}

export default consolidated