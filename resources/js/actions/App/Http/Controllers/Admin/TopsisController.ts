import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
/**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
export const show = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/courses/{course}/topsis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
show.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
show.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
show.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
    const showForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
        showForm.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TopsisController::show
 * @see app/Http/Controllers/Admin/TopsisController.php:27
 * @route '/admin/courses/{course}/topsis'
 */
        showForm.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\TopsisController::calculate
 * @see app/Http/Controllers/Admin/TopsisController.php:76
 * @route '/admin/courses/{course}/topsis/calculate'
 */
export const calculate = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(args, options),
    method: 'post',
})

calculate.definition = {
    methods: ["post"],
    url: '/admin/courses/{course}/topsis/calculate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TopsisController::calculate
 * @see app/Http/Controllers/Admin/TopsisController.php:76
 * @route '/admin/courses/{course}/topsis/calculate'
 */
calculate.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return calculate.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TopsisController::calculate
 * @see app/Http/Controllers/Admin/TopsisController.php:76
 * @route '/admin/courses/{course}/topsis/calculate'
 */
calculate.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: calculate.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TopsisController::calculate
 * @see app/Http/Controllers/Admin/TopsisController.php:76
 * @route '/admin/courses/{course}/topsis/calculate'
 */
    const calculateForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: calculate.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TopsisController::calculate
 * @see app/Http/Controllers/Admin/TopsisController.php:76
 * @route '/admin/courses/{course}/topsis/calculate'
 */
        calculateForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: calculate.url(args, options),
            method: 'post',
        })
    
    calculate.form = calculateForm
const TopsisController = { calculateAll, lock, show, calculate }

export default TopsisController