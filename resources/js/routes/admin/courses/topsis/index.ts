import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
const topsis = {
    show: Object.assign(show, show),
calculate: Object.assign(calculate, calculate),
}

export default topsis