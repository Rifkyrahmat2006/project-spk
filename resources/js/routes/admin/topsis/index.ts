import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TopsisController::calculateAll
 * @see app/Http/Controllers/Admin/TopsisController.php:113
 * @route '/admin/topsis/calculate-all'
 */
export const calculateAll = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateAll.url(options),
    method: 'post',
})

calculateAll.definition = {
    methods: ["post"],
    url: '/admin/topsis/calculate-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TopsisController::calculateAll
 * @see app/Http/Controllers/Admin/TopsisController.php:113
 * @route '/admin/topsis/calculate-all'
 */
calculateAll.url = (options?: RouteQueryOptions) => {
    return calculateAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TopsisController::calculateAll
 * @see app/Http/Controllers/Admin/TopsisController.php:113
 * @route '/admin/topsis/calculate-all'
 */
calculateAll.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculateAll.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TopsisController::calculateAll
 * @see app/Http/Controllers/Admin/TopsisController.php:113
 * @route '/admin/topsis/calculate-all'
 */
    const calculateAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: calculateAll.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TopsisController::calculateAll
 * @see app/Http/Controllers/Admin/TopsisController.php:113
 * @route '/admin/topsis/calculate-all'
 */
        calculateAllForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: calculateAll.url(options),
            method: 'post',
        })
    
    calculateAll.form = calculateAllForm
/**
* @see \App\Http\Controllers\Admin\TopsisController::lock
 * @see app/Http/Controllers/Admin/TopsisController.php:144
 * @route '/admin/topsis/periods/{period}/lock'
 */
export const lock = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

lock.definition = {
    methods: ["post"],
    url: '/admin/topsis/periods/{period}/lock',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TopsisController::lock
 * @see app/Http/Controllers/Admin/TopsisController.php:144
 * @route '/admin/topsis/periods/{period}/lock'
 */
lock.url = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { period: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { period: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    period: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        period: typeof args.period === 'object'
                ? args.period.id
                : args.period,
                }

    return lock.definition.url
            .replace('{period}', parsedArgs.period.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TopsisController::lock
 * @see app/Http/Controllers/Admin/TopsisController.php:144
 * @route '/admin/topsis/periods/{period}/lock'
 */
lock.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lock.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TopsisController::lock
 * @see app/Http/Controllers/Admin/TopsisController.php:144
 * @route '/admin/topsis/periods/{period}/lock'
 */
    const lockForm = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lock.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TopsisController::lock
 * @see app/Http/Controllers/Admin/TopsisController.php:144
 * @route '/admin/topsis/periods/{period}/lock'
 */
        lockForm.post = (args: { period: number | { id: number } } | [period: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lock.url(args, options),
            method: 'post',
        })
    
    lock.form = lockForm
const topsis = {
    calculateAll: Object.assign(calculateAll, calculateAll),
lock: Object.assign(lock, lock),
}

export default topsis